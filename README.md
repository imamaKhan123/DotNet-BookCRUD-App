# DotNet Book CRUD App

A simple and lightweight Book Management Web Application built using **ASP.NET Core MVC** with **Entity Framework Core**. This app demonstrates basic CRUD operations (Create, Read, Update, Delete) for managing books in a library-like system.

## Features

- Create a new book entry
- View all books in a list
- Edit existing book details
- Delete a book
- Responsive UI with Bootstrap
- Connected to a local database using Entity Framework Core

## Technologies Used

- ASP.NET Core MVC (.NET 6 or later)
- Entity Framework Core
- SQL Server / LocalDB
- Bootstrap 5
- Razor Views

## Screenshots<img width="414" alt="Screenshot 2025-06-19 at 18 19 01" src="https://github.com/user-attachments/assets/cf3b086b-476f-4b3c-ab96-444463066fb1" />
<img width="449" alt="Screenshot 2025-06-19 at 18 19 24" src="https://github.com/user-attachments/assets/573787d4-2c57-4c5c-98f2-98ffac7a6e4d" />
<img width="449" alt="Screenshot 2025-06-19 at 18 19 40" src="https://github.com/user-attachments/assets/a4412ba5-47f5-4aa5-9546-95903645208a" />


<img width="469" alt="Screenshot 2025-06-19 at 18 14 55" src="https://github.com/user-attachments/assets/c3f42ee1-90e4-4f81-9927-a57943cb4359" />
<img width="469" alt="Screenshot 2025-06-19 at 18 15 09" src="https://github.com/user-attachments/assets/12d911d9-894f-4329-8ff0-48034a9a8a92" />
<img width="579" alt="Screenshot 2025-06-19 at 18 15 34" src="https://github.com/user-attachments/assets/321acabd-af99-4b43-9bf2-032a23a3d6b7" />
<img width="414" alt="Screenshot 2025-06-19 at 18 17 07" src="https://github.com/user-attachments/assets/e272dbaf-70d6-48eb-8774-a326ac212c40" />
<img width="414" alt="Screenshot 2025-06-19 at 18 17 25" src="https://github.com/user-attachments/assets/df4732ae-0e4e-44fb-8bd0-35e8ca120e86" />
<img width="469" alt="Screenshot 2025-06-19 at 18 14 44" src="https://github.com/user-attachments/assets/b4f59f41-ca18-46dc-a96f-aa2672a66329" /><img width="469" alt="Screenshot 2025-06-19 at 18 13 41" src="https://github.com/user-attachments/assets/078d5205-bd5c-4621-9729-39fb20ceb68c" />


## Getting Started


### Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/download)
- Visual Studio or VS Code
- SQL Server / LocalDB (optional for default setup)

### Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/imamaKhan123/DotNet-BookCRUD-App.git
   cd DotNet-BookCRUD-App


   Restore dependencies:

bash
Copy
Edit
dotnet restore
Apply migrations (if using EF Core Code First):

bash
Copy
Edit
dotnet ef database update
Run the app:

bash
Copy
Edit
dotnet run
Visit: https://localhost:5001 or http://localhost:5000

Folder Structure
bash
Copy
Edit
DotNet-BookCRUD-App/
│
├── Controllers/        # BookController.cs
├── Models/             # Book.cs
├── Views/              # Razor pages for UI
├── Data/               # ApplicationDbContext.cs
├── wwwroot/            # Static files (CSS, JS)
└── Program.cs & Startup.cs
Deployment
You can deploy this app for free using platforms like:

Render.com

Azure App Service (Free Tier)

Railway.app (experimental)

Author
Imama Khan
https://www.linkedin.com/in/imama-jahanzaib-319592b9/
