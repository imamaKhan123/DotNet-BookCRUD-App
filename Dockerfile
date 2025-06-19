# Build stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY book-app-api/*.csproj ./book-app-api/
RUN dotnet restore ./book-app-api/book-app-api.csproj
COPY . .
WORKDIR /src/book-app-api
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "book-app-api.dll"]
