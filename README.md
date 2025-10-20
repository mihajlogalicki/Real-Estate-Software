## Real Estate Aplication functionality
Sign-in user is able to add property details including: Sell or Rent property, price, multiple images, property type,
furnished or not, property ready to move (establishment), property is not ready to move (possession/available from)...
Property owner is able to add multiple images for particular property, delete images, set primary photo.
Main page contains filter functionality for properties (sort by price, name, search, preview property detail).

## Technology stack & implementation description
BACK-END: .NET Core, Cloudinary file storing, Entity Framework Core, Migration with Code-First approach, Microsoft SQL Server, Authentication & Authorization, REST APIs, Dependency Injection,
Unit Of Work + Repository pattern, generating JWT, Custom Cryptography password, DTOs, Custom Middleware error handler, AutoMapper, Data Annotations, Exception handling with specific HTTP status.

FRONT-END: Angular 19, RxJS operators, Prime-NG library, interceptor, Angular pipes, Services for HTTP request handling,
Component communication with @Input/@Output decorators, App module for registering all components, providers, configurations, PrimeNG modules.
