import pandas as pd
# from fbprophet import Prophet
from matplotlib import pyplot
from pmdarima import auto_arima
from sklearn.metrics import mean_squared_error

import sys
id=sys.argv[1]
df = pd.read_csv(f"./public/{id}.csv", encoding="ISO-8859-1")
'''converting all column names to lower case'''
df.columns = map(str.lower, df.columns)
try:
    Xdf = df[['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country']]
except KeyError as err:
    print("Key error: {0}".format(err))
    exit()
#de_duplication
df.drop_duplicates(subset=['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country'], keep='first', inplace=True)
#date_format_standardization
if '/' in df['invoicedate']:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%e -%m -%Y')
else:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%m -%e -%Y')
    
    
sales_df=df


new_df = df.groupby(['invoiceno', 'invoicedate', 'customerid', 'country'])['unitprice'].sum()
df = new_df.to_frame().reset_index()

def parser(x):
    return datetime.strptime('190' + x, '%Y-%m')

df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
df['invoicedate'] = df['invoicedate'].dt.strftime('%Y-%m-%d')

df = df.groupby(['invoicedate'])['unitprice'].sum()
df = df.to_frame()
df.to_excel(f"./excel_files/{id}/ARIMA.xlsx")
df.to_csv(f"./excel_files/{id}/Sales_Forecasting_Predicted_file.csv")

# df = pd.Series(df["unitprice"].values, df["invoicedate"])
# stepwise_model = auto_arima(df, start_p=1, start_q=1,
#                             max_p=3, max_q=3, m=12,
#                            start_P=0, seasonal=True,
#                            d=1, D=1, trace=True,
#                            error_action='ignore',
#                            suppress_warnings=True,
#                            stepwise=True)
# size = int(len(df) * .85)
# train, test = df[0:size], df[size:]

# stepwise_model.fit(train)
# future_forecast = stepwise_model.predict(n_periods=len(test))
# future_forecast = pd.DataFrame(future_forecast, index=test.index, columns=['Prediction'])

# error = mean_squared_error(test, future_forecast)

# print('Test MSE: %f' % error)

trending_products=pd.DataFrame()
trending_products = sales_df.groupby(['description'])['quantity'].sum().reset_index().sort_values(by=['quantity'], ascending=False).head(5)
all_trending_products = sales_df.groupby(['description'])['quantity'].sum().reset_index().sort_values(by=['quantity'], ascending=False)

sales_df['total_price']=sales_df['unitprice']*sales_df['quantity']
sales_df['total_price']=sales_df['total_price'].apply(int)

all_trending_products_by_sale_price_5 = sales_df.groupby(['description'])['total_price'].sum().reset_index().sort_values(by=['total_price'], ascending=False).head(5)
all_trending_products_by_sale_price_all = sales_df.groupby(['description'])['total_price'].sum().reset_index().sort_values(by=['total_price'], ascending=False)

products=list(trending_products['description'])
products=[i for i in reversed(products)]
print(products)
prices=list(trending_products['quantity'])
prices=[i for i in reversed(prices)]
print(prices)

trending_products.to_csv(f"./excel_files/{id}/trend_5.csv")
all_trending_products.to_csv(f"./excel_files/{id}/trend_all.csv")
all_trending_products_by_sale_price_5.to_csv(f"./excel_files/{id}/trend_by_sales_5.csv")
all_trending_products_by_sale_price_all.to_csv(f"./excel_files/{id}/trend_by_sales_all.csv")

print('Sales Forecasting Executed Successfully !')

