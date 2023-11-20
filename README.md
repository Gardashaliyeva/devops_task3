# Project Report: Deployment of a Web Application with a Database Backend using Ansible

## Introduction

This project involved the utilization of Ansible roles for structured task execution and Ansible Vault for securing sensitive information. The implementation encompassed the provisioning of an Express.js web application named Student Management System and its associated MySQL database with Ansible; however, the creation of a custom Docker image for the web application, and the management of the entire deployment process were not achieved due to errors that could not be resolved.

## Project Objectives

The project objectives that were successfully achieved are follows:

1. **Creation of Ansible Roles:**
   - A role for the setup of the database server was created.
   - Another role for the configuration of the web application was established.

2. **Utilization of Ansible Vault:**
   - Sensitive data, such as database passwords, database user, and database name were securely stored and employed.

## Project Structure

The project structure encompassed the following directories:

![image](https://github.com/Gardashaliyeva/devops_task3/assets/94057319/2673c196-6c30-4504-9c5f-d351941ebca7)

![image](https://github.com/Gardashaliyeva/devops_task3/assets/94057319/e4d4ae61-053c-478f-99fc-d83da8de5aac)

The organizational structure ensured that:

- Ansible roles for the database and web application were available in the `roles/` directory.
- The `playbook.yml` defined the Ansible playbook used for orchestrating the deployment.
- The `inventory` file specified the target machine(s) for deployment.
- The `ansible.cfg` configuration file was in place for Ansible settings.
- Sensitive information was encrypted using Ansible Vault in `secret.yml`.

## Ansible Roles

### Database Role (`roles/database`)

- MySQL was installed using Chocolatey.
- The MySQL service was initiated.
- A MySQL database was created.

### Web Application Role (`roles/webapp`)

- Web application files were copied from Windows to the target machine.
- npm dependencies were installed.
- A Docker image for the web application was constructed.
- A Docker container for the web application was launched.

## Playbook (`playbook.yml`)

- Pre-tasks were configured to include secret variables from Ansible Vault.
- Both the database and web application roles were applied.
- The presence of Chocolatey for package management was ensured.
- MySQL was installed on Windows.

## Usage Instructions

**1. Clone the Repository**

   - Begin by cloning this project repository to your local machine. You can use the following command in your terminal:
    
     `git clone <repository_url>`

**2. Customize the Inventory File**

   - Open the inventory file located in the project directory using a text editor.
   - Replace <target_machine_ip> with the actual IP address or hostname of the target machine where you want to deploy the web application and database.
   - Save and close the inventory file after making the necessary changes.
   - Encrypt Sensitive Information using Ansible Vault. To create a new Ansible Vault-encrypted file, run the following command in the project directory:
     `ansible-vault create secret.yml`
   - You will be prompted to enter and confirm a vault password. Remember this password as you will need it to access the encrypted secrets.
   - Enter your sensitive information in the file. For example, if you need to specify database credentials, you can do so like this:
     
     ```
      db_root_password: your_root_password
      db_user: your_database_user
      db_password: your_database_password
      db_name: your_database_name
      ```
   - After adding your sensitive information, save and close the secret.yml file.

**3. Run the Playbook**

   - Open your terminal and navigate to the project directory.
   - Run the following command to execute the Ansible playbook, and you will be prompted to enter the vault password you set earlier:
     `ansible-playbook playbook.yml -i inventory --ask-vault-pass`

     ![image](https://github.com/Gardashaliyeva/devops_task3/assets/94057319/1d610d5a-b997-470a-bce3-be9994c403a4)

      
