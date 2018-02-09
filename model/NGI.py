import pandas as pd 
import numpy as np
from random import sample
import random
from sklearn.cross_validation import StratifiedKFold,cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_absolute_error,accuracy_score
import json
from flask import Flask
from flask.ext.cors import CORS, cross_origin
from flask import request

import sys, json
app = Flask(__name__)

@app.route("/api/pridect", methods=["POST"])



def GetPreditctions():
	
	feature_list=['change_oil_ind' , 'engine_oil_life','engine_oil_pressure' ,'engine_oil_temp','engine_coolant_temp' ,'EV_active_cooling' ,'fuel_water_ind' ]
	df=pd.read_csv('dataengine.csv')
	train_df=df[feature_list].values
	target=df.breakdown.values

	kfold=list(StratifiedKFold(y=target,n_folds=5,shuffle=True,random_state=2018))

	clf=LogisticRegression()
	for j,(IdTrain,IdTest) in enumerate(kfold):
		print('=======================Cros Validation test',j,'====================')
		x_train = train_df[IdTrain]
		y_train = target[IdTrain]
		x_test = train_df[IdTest]
		y_test= target[IdTest]
		clf.fit(x_train,y_train)
		p=clf.predict(x_test)
		print('accuracy',100*accuracy_score(p,y_test),'error',mean_absolute_error(p,y_test))
	data = request.get_json()
	engine_oil_pressure=data['engine_oil_pressure']
	change_oil_ind=data['change_oil_ind']
	engine_oil_life=data['engine_oil_life']
	engine_oil_temp=data['engine_oil_temp']
	engine_coolant_temp=data['engine_coolant_temp']
	EV_active_cooling=data['EV_active_cooling']
	fuel_water_ind=data['fuel_water_ind']
	predictions={}
	preds=[]
	for i in range(len(change_oil_ind)):
		datapredections=[[int(change_oil_ind[i]), int(engine_oil_life[i]),int(engine_oil_pressure[i]) ,int(engine_oil_temp[i]),int(engine_coolant_temp[i]) ,int(EV_active_cooling[i]) ,int(fuel_water_ind[i])]]
		p=clf.predict(datapredections)
		preds.append(p)
	predictions.update({"predctions":preds})
	
	print(pd.Series(predictions).to_json(orient='index'))
		
	return (pd.Series(predictions).to_json(orient='index')) ;
	
if __name__ == '__main__':
    app.run(debug=True)
