# Food Delivery Application

## Overview

The Food Delivery Application is a microservices-based system designed to facilitate seamless interactions between users, restaurants, and delivery personnel. Built using Java and Spring Boot, the application ensures scalability, maintainability, and efficient service management.

## Microservices Architecture

The application comprises the following microservices:

- **API Gateway**: Serves as the single entry point for all client requests, routing them to the appropriate services and handling cross-cutting concerns such as authentication and logging.

- **Auth Service**: Manages user authentication and authorization, issuing JWT tokens upon successful login.

- **User Service**: Handles user registration, profile management, and role assignments.

- **Restaurant Service**: Manages restaurant information, including menus, locations, and operating hours.

- **Order Service**: Oversees the creation, updating, and tracking of food orders.

- **Payment Service**: Integrates with external payment gateways to process transactions securely.

- **Eureka Server**: Facilitates service discovery, allowing microservices to locate and communicate with each other dynamically.

## Features

- **User Authentication**: Secure login and registration with role-based access control.

- **Restaurant Management**: CRUD operations for restaurant data and menu items.

- **Order Processing**: Seamless order placement, modification, and tracking.

- **Payment Integration**: Secure payment processing through third-party gateways.

- **Service Discovery**: Dynamic discovery of microservices using Eureka Server.

## Technologies Used

- **Backend**: Java, Spring Boot

- **Service Discovery**: Netflix Eureka

- **API Gateway**: Spring Cloud Gateway

- **Security**: Spring Security, JWT

## Getting Started

### Prerequisites

- Java 17 or higher

- Maven

- Docker (optional, for containerization)
