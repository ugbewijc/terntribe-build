<div style="text-align: center;">
   <h1 style="text-align: center;">Terntribe BUILD Role Assessments for Back-End Engineers</h1>
      <p style="text-align: center;">
         <!-- <a href="#">View Demo</a> -->
         <a href="https://github.com/ugbewijc/web-product-catalog/issues">Report Bug</a> - 
         <a href="https://github.com/ugbewijc/web-product-catalog/issues">Request Feature</a>
      </p>
</div>

## Task: Build a RESTful API to manage causes and contributions.

### Specification:
1. **Objective:** Create an API that supports CRUD operations for social causes.

2. **Requirements:**
    - **Endpoints:**
        1. ***POST*** /causes: *Create a new cause (fields: title, description, image URL).*
        2. ***GET*** /causes: *Retrieve all causes.*
        3. ***GET*** /causes/:id: *Retrieve a specific cause by ID.*
        4. ***PUT*** /causes/:id: *Update a specific cause.*
        5. ***DELETE*** /causes/:id: *Delete a cause.*
        
    - Add an additional endpoint:
        1. ***POST*** /causes/:id/contribute: *Accept contributions to a cause (fields: name, email, amount).*
    - Use **JSON** for request and response formats.



## Getting Started

You can download/clone this project from this repo and set it up on your development environment, following the steps below.
   #### Prerequisites
   You will need the folloing to run this program successfully
   - [NodeJs](https://nodejs.org/en/download) v22.12 or higher

   #### Installation
   
      
   1. Clone the repo

      ```sh
      git clone https://github.com/ugbewijc/terntribe-build.git
      ```      
   2. Change directory project directory

      ```sh
      cd terntribe-build
      ```
   3. Install NPM packages
      ```sh
      pnpm install
      ```      
   4. Start application
      ```sh
      pnpm dev 
      ```

## Usage

<!-- This space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. -->
Kindly check on the [API Doc](./doc/api.md) for API Request and Response