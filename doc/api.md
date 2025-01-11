<h1 style="text-align: center;">API Doc</h1>
<br>

- ## ***POST*** /causes
    
    This endpoint creates a new cause.


    ### REQUEST

     **Request Header**
    
        Content Type : application/json
    **Request Body**
    ```json
        {
            "title": "cause_name",
            "description": "cause_desription",
            "image_url": "image_URL"
        }
    ```
    **Parameters**
        <table style="margin-left: 40px;">
            <tr><th>Parameters</th>           <th>Value</th>      <th>Data Type</th></tr>
            <tr><td>title</td>   <td>required</td>       <td>string</td></tr>
            <tr><td>description</td>        <td>required</td>       <td>string</td></tr>
            <tr><td>image</td>        <td>required</td>       <td>string</td></tr>
        </table>


    <br>

    ### RESPONSE 

     **Success Response  Header**
    
        Content Type : application/json
        status code : 201

    **Success Response Body**

    ```json
        {
            "data":[{
                "id": "cause_id",
                "title": "cause_name",
                "description": "cause_desription",
                "image_url": "image_URL"
                }]
        }
    ```
    

     **Error Response  Header**
    
        Content Type : application/json
        status code : 400

    **Error Response Body**

    ```json
        {
            "data":["error_message"]
        }
    ```

<br/><br/><br/>

- ## ***GET*** /causes
    
    This endpoint retrieve all causes.


    ### REQUEST

     **Request Header**
    
        Content Type : application/json

    <br>

    ### RESPONSE 

     **Success Response  Header**
    
        Content Type : application/json
        status code : 200

    **Success Response Body**

    ```json
        {
            "data":[{
                "id": "cause_id",
                "title": "cause_name",
                "description": "cause_desription",
                "image_url": "image_URL"
                },{
                "id": "cause_id",
                "title": "cause_name",
                "description": "cause_desription",
                "image_url": "image_URL"
                }, ...
                ]
        }
    ```
    

     **Error Response  Header**
    
        Content Type : application/json
        status code : 404

    **Error Response Body**

    ```json
        {
            "data":["error_message"]
        }
    ```

<br/><br/><br/>

- ## ***GET*** /causes/:id
    
    This endpoint retrieve a specific cause by ID.


    ### REQUEST

     **Request Header**
    
        Content Type : application/json

    <br>

    ### RESPONSE 

     **Success Response  Header**
    
        Content Type : application/json
        status code : 200

    **Success Response Body**

    ```json
        {
            "data":[{
                "id": "cause_id",
                "title": "cause_name",
                "description": "cause_desription",
                "image_url": "image_URL"
                }]
        }
    ```
    

     **Error Response  Header**
    
        Content Type : application/json
        status code : 404

    **Error Response Body**

    ```json
        {
            "data":["error_message"]
        }
    ```

<br>
<br>

- ## ***PUT*** /causes/:id
    
    This endpoint update a specific cause by ID.


    ### REQUEST

     **Request Header**
    
        Content Type : application/json
    
    **Request Body**
    ```json
        {
            "title": "cause_name",
            "description": "cause_desription",
            "image_url": "image_URL"
        }
    ```
    **Parameters**
        <table style="margin-left: 40px;">
            <tr><th>Parameters</th>           <th>Value</th>      <th>Data Type</th></tr>
            <tr><td>title</td>   <td>required</td>       <td>string</td></tr>
            <tr><td>description</td>        <td>required</td>       <td>string</td></tr>
            <tr><td>image</td>        <td>required</td>       <td>string</td></tr>
        </table>


    <br>

    ### RESPONSE 

     **Success Response  Header**
    
        Content Type : application/json
        status code : 201

    **Success Response Body**

    ```json
        {
            "data":[{
                "id": "cause_id",
                "title": "cause_name",
                "description": "cause_desription",
                "image_url": "image_URL"
                }]
        }
    ```
    

     **Error Response Header**
    
        Content Type : application/json
        status code : 404

    **Error Response Body**

    ```json
        {
            "data":["error_message"]
        }
    ```

<br/><br/><br/>


<br/><br/><br/>

- ## ***DELETE*** /causes/:id
    
    This endpoint delete a cause by ID.


    ### REQUEST

     **Request Header**
    
        Content Type : application/json

    <br>

    ### RESPONSE 

     **Success Response  Header**
    
        Content Type : application/json
        status code : 201

    **Success Response Body**

    ```json
        {
            "data":[]
        }
    ```
    

     **Error Response  Header**
    
        Content Type : application/json
        status code : 404

    **Error Response Body**

    ```json
        {
            "data":["error_message"]
        }
    ```
<br/><br/><br/>

- ## ***POST*** /causes/:id/contribute
    
    This endpoint accept contributions to a cause.


    ### REQUEST

     **Request Header**
    
        Content Type : application/json
    **Request Body**
    ```json
        {
            "name": "contributor_name",
            "email": "contributor_email_address",
            "amount": "amount"
        }
    ```
    **Parameters**
        <table style="margin-left: 40px;">
            <tr><th>Parameters</th>           <th>Value</th>      <th>Data Type</th></tr>
            <tr><td>name</td>   <td>required</td>       <td>string</td></tr>
            <tr><td>email</td>        <td>required</td>       <td>string</td></tr>
            <tr><td>amount</td>        <td>required</td>       <td>number</td></tr>
        </table>


    <br>

    ### RESPONSE 

     **Success Response  Header**
    
        Content Type : application/json
        status code : 201

    **Success Response Body**

    ```json
        {
            "data":[{
                "id":"contributor_id",
                "title": "cause_name",
                "description": "cause_desription",
                "image_url": "image_URL",
                "causeId": "cause_id",
                }]
        }
    ```
    

     **Error Response  Header**
    
        Content Type : application/json
        status code : 400

    **Error Response Body**

    ```json
        {
            "data":["error_message"]
        }
    ```