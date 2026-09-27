# FoodLab
FoodLab is the working title of my recipe-hub and weekly food planner. <br/> 
It started as and idea i wanted to work on outside of schoolhours but now during the course "Avancerad Fullstackutveckling" in INL1 i found the perfect chance to finsish my idea and combine it with the [Fullstack App & Azure](https://qlok.notion.site/Fullstack-App-Azure-3ada11b2b40c80f1a27ce0dc54c5116c) Assignment.

## Description
**So what does it do?**<br/> 
FoodLab is an app that lets you and the public save recipes with descriptions and ingredients, but thats only about 50% of the app. The main thing i wanted to solve was how hard it is to come up with a weekly plan of what to eat, so FoodLab helps you with that.<br/> <br/> 
FoodLab lets you randomize a weekly plan of what to eat each day of the week and after that generate a shopping list of what ingredients and how much you need to put on your weekly shoppinglist. Great right?<br/> <br/>
I would still say that this app is in its early stages of development and the ui/ux is far from perfect, but i need to hand in my assignment later tonight. I will continue working on it when i have time.

## Features
- Register and log in.
- Create, edit and delete recipes.
- Save and rate recipes.
- Generate weekly meal plans.
- Generate shopping lists.
- Separate public and private recipes.

## Stack
<table>
  <tr>
    <td align="left">
      <strong>Frontend</strong><br>
                - React<br>
                - Vite<br>
                - Axios<br>
                - shadcn/ui
    </td>
    <td align="left">
      <strong>Backend</strong><br>
                - ASP.NET Core Web API<br>
                - Entity Framework Core<br>
                - ASP.NET Core Identity<br>
                - SQL Server
    </td>
    <td align="left">
      <strong>Deployment</strong><br>
                - Azure App Service<br>
                - Azure SQL Database<br>
                - GitHub Actions<br>
                - Sweat and tears
    </td>
  </tr>
</table>

## Architecture
- React handles the user interface.
- The frontend communicates with the API through Axios.
- ASP.NET Core handles authentication and business logic.
- Entity Framework Core communicates with SQL Server.
- Cookie authentication and CSRF protection secure requests.

#### Links
- GitHub: https://github.com/gqvist/FoodLab<br/>
- Frontend: https://foodlab-frontend-ehbrfnggbuf0gjag.denmarkeast-01.azurewebsites.net/<br/>
- Scalar: https://foodlab-backend-gzdgbwcfghbpeucr.denmarkeast-01.azurewebsites.net/scalar<br/>