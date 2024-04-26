from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import json
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Enable CORS for all routes in the Flask app

# Define a route to handle the POST request from React frontend
@app.route('/api/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get the data sent from the frontend
        data = request.json
        
        # Extract X_new from the received data
        X_new = data.get('X_new')
        # print(X_new)

        # Loading model using joblib
        loaded_model=joblib.load('model_saved.h5')

        df=pd.read_csv('AdmitsandRejectstrain.csv',index_col=0)
        df=pd.read_csv('AdmitsandRejectstrain.csv',index_col=0)
        df['status'] = df['status'].replace({'Admit': 1, 'Reject': 0})
        df['GroupNew'] = df['GroupNew'].replace({'A': 1, 'B': 2,'C':3})
        df['Gpa'] = np.where(df['Gpa'] < 6, 6, df['Gpa'])
        df['Work experience'] = np.where(df['Work experience'] > 2, 2, df['Work experience'])
        df=df.drop('Group', axis=1)

        column_name = 'status'
        df[column_name] = pd.to_numeric(df[column_name], errors='coerce')

        df=df.drop('Undergrad ', axis=1)
        df = df.drop('postgrad uni', axis=1)    

        numerical_df = df.drop('GroupNew', axis=1)
        scaler = MinMaxScaler()

        # *****************************************************************************************
        normalized_data =scaler.fit(numerical_df)
        # Transform the new data point using the fitted scaler
        normalized_new_data_point = normalized_data.transform(X_new)

        ans = loaded_model.predict(normalized_new_data_point)
        rank = ans[0]
        print(rank)
        if rank==1:
            universities = ["Massachusetts Institute of Technology (MIT)", "Stanford University", "University of California--Berkeley", "Carnegie Mellon University", "University of Illinois Urbana Champaign", "University of Washington", "Cornell University", "Georgia Institute of Technology", "Princeton University", "University of Texas Austin", "University of Michigan--Ann Arbor", "University of California--San Diego", "University of Wisconsin--Madison", "California Institute of Technology", "Columbia University", "University of California Davis", "Harvard University", "University of Maryland", "University of Pennsylvania", "Duke University", "Purdue University", "Yale University"]
        elif rank == 2:
            universities = ["Johns Hopkins University", "Ohio State University", "University of Illinois at Springfield", "University of California--Santa Barbara", "University of Chicago", "University of Massachusetts Amherst", "University of North Carolina--Chapel Hill", "California State University Los Angeles", "University of Southern California", "University of Virginia", "Brown University", "Northwestern University", "Rice University", "University of California--Irvine", "New York University", "Northeastern University Boston", "Pennsylvania State University--University Park", "University of Colorado--Boulder", "University of Minnesota--Twin Cities", "Virginia Tech University"]
        else:
            universities = ["Rutgers, The State University of New Jersey--Newark", "Texas A&M University", "University of California--Davis", "University of Utah", "Washington University in St. Louis", "Arizona State University", "Stony Brook University", "Dartmouth College", "University of Florida", "Boston University", "Michigan State University", "North Carolina State University", "University of Arizona", "University of California--Santa Cruz", "University of Notre Dame", "Vanderbilt University", "Indiana University Bloomington", "University of California--Riverside", "University of Pittsburgh", "Iowa State University", "Rensselaer Polytechnic Institute", "Tufts University", "University of Illinois--Chicago", "University of Rochester"]


        json_data = json.dumps(universities)
        return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True, port=4000)
