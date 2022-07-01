<h1 align="center">
	<img src="https://img.shields.io/badge/KRUGER-FF9016.svg?style=for-the-badge&label=Front-End%20Challenge&logoColor=white" title="Título del Proyecto" height="75" />
</h1>

<div align="center">
	<a href="https://github.com/svillacreses/front-end-challenge/graphs/contributors"><img src="https://img.shields.io/github/contributors/svillacreses/front-end-challenge.svg?style=for-the-badge&label=Contribuciones&labelColor=364039&color=769c81" title="Contribuciones" height="25" /></a>&#160;&#160;&#160;&#160;
	<a href="https://github.com/svillacreses/front-end-challenge/stargazers"><img src="https://img.shields.io/github/stars/svillacreses/front-end-challenge.svg?style=for-the-badge&label=Estrellas&labelColor=364039&color=769c81" title="Estrellas" height="25" /></a>&#160;&#160;&#160;&#160;
	<a href="https://github.com/svillacreses/front-end-challenge/stargazers"><img src="https://img.shields.io/github/license/svillacreses/front-end-challenge.svg?style=for-the-badge&label=Licencia&labelColor=364039&color=769c81" title="Licencia" height="25" /></a>
	<br><br>
	<a href="https://linkedin.com/in/svillacreses" style="margin-left:auto;"><img src="https://img.shields.io/badge/LinkedIn-0077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" title="LinkedIn - Santiago Villacreses" height="50" /></a>
	<br><br>
	<h2>Built With:</h2>
	<a href="https://es.reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" title="React v18" height="40" /></a>
	<a href="https://v5.reactrouter.com/"><img src="https://img.shields.io/badge/React_Router-252525?style=for-the-badge&logo=react-router&logoColor=E94949" title="React Router" height="40" /></a>
	<a href="https://mui.com/"><img src="https://img.shields.io/badge/Material%20UI-0A1929?style=for-the-badge&logo=mui&logoColor=007FFF" title="MUI" height="40" /></a>
	<br>
	<a href="https://fontawesome.com/"><img src="https://img.shields.io/badge/Font_Awesome-001C40?style=for-the-badge&logo=fontawesome&logoColor=74C0FC" title="Font Awesome Icons" height="40" /></a>
	<a href="https://getbootstrap.com/"><img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" title="Bootstrap" height="40" /></a>
</div>
<div align="center">
	<h2>Capturas de Pantalla:</h2>
	<img width="49%" alt="image" src="https://user-images.githubusercontent.com/66692792/176865627-b544e689-189f-4dc8-abc1-22e9ecb850cf.png">
	<img width="49%" alt="image" src="https://user-images.githubusercontent.com/66692792/176860045-4902e0d4-e0de-4ee5-83ba-bdaa3526fa67.png">
	<br>
	<img width="49%" alt="image" src="https://user-images.githubusercontent.com/66692792/176860698-ba8f7ecf-dcd7-43aa-b43a-f543f3ca129f.png">
	<img width="49%" alt="image" src="https://user-images.githubusercontent.com/66692792/176861171-5ef0c260-7c11-43ee-9bc1-ad3389c1aeaf.png">
	<br><br>
	<a href="https://svillacreses.github.io/front-end-challenge/"><img src="https://img.shields.io/badge/DEMO-438AAF.svg?style=for-the-badge&label=LIVE&logoColor=273943" title="Ir a Demo" height="50" /></a>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

I focused on the Front-End part of the project, every little detail counts.

Some specifications:

- Browser Local Storage used to simulate the Back-End
- The file `./src/data/bd.js` has the initial list of users (first time usage only) and the types of vaccines according to the given definitions.
- Login / Home screens validating routes and user roles
- In order to change the default role `EMPLEADO` when creating users, you just have to change the var `DEFAULT_ROLE` located in `./src/utils/Constants.js` from `EMPLEADO` to `ADMIN` (Or change each role manually using the DevTools of your browser :wink:)
- The `EMPLEADO` role only has access to `MIS DATOS`, where he can update / complete all his information
- The `ADMIN` role has access to a second screen called `LISTADO DE EMPLEADOS`, where there's a table with the list of current registered users, `ADMINS` can perform CRUD operations over employees.
- Some columns of the table can be sorted, filtered and hidden (MUI DataGrid Functionalities hehe)
- You can filter by `Tipo de Vacuna` with the help of a multiselect input, the other fields only with the default filter options of the DataGrid.
- Each form field is validated as requested
- When an `ADMIN` registers a new employee, the username of its employee is generated with the first letter of the field `nombres` and the first word of the field `apellidos`, and the password is the same as the field `cedula` (Unique Key), so there could be users with the same username but not with the same password.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Just need `NPM`

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/svillacreses/front-end-challenge.git
   ```
2. Install NPM packages
   ```sh
   npm i
   ```
3. Run the project
   ```sh
   npm start
   ```
4. Use the default credentials (`admin`-`admin`) to Login or add more users (with the same structure) manually in `./src/data/bd.js`
   ```js
   const USERS = [defaultUser, ...yourUsersWithSameStructure];
   ```

<p align="right">(<a href="#top">back to top</a>)</p>
