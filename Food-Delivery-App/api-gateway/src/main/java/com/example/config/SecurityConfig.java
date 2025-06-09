package com.example.config;

import com.example.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAuthenticationFilter jwtAuthenticationFilter,
            JwtAccessDeniedHandler jwtAccessDeniedHandler) {
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    private CorsConfiguration corsConfiguration() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:8081");
        corsConfig.addAllowedMethod("*");
        corsConfig.addAllowedHeader("*");
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(3600L);
        corsConfig.addExposedHeader("Authorization");
        return corsConfig;
    }

    @Bean
    SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration());

        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(cors -> cors.configurationSource(source))
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(jwtAccessDeniedHandler))
                .authorizeExchange(authorizeExchangeSpec -> authorizeExchangeSpec
                        // Auth Service - Public endpoints
                        .pathMatchers(HttpMethod.POST, "/auth-service/api/login").permitAll()
                        .pathMatchers(HttpMethod.POST, "/auth-service/api/register").permitAll()

                        // User Service - Admin only endpoints
                        .pathMatchers(HttpMethod.GET, "/user-service/api/user/email/**").hasRole("Admin")
                        .pathMatchers(HttpMethod.GET, "/user-service/api/users").hasRole("Admin")
                        .pathMatchers(HttpMethod.POST, "/user-service/api/user").hasRole("Admin")
                        .pathMatchers(HttpMethod.DELETE, "/user-service/api/user/**").hasRole("Admin")
                        .pathMatchers(HttpMethod.DELETE, "/user-service/api/users").hasRole("Admin")

                        // User Service - User/Admin endpoints (handled by controller-level checks)
                        .pathMatchers(HttpMethod.GET, "/user-service/api/user/**").authenticated()
                        .pathMatchers(HttpMethod.PUT, "/user-service/api/user").authenticated()
                        .pathMatchers(HttpMethod.GET, "/user-service/api/user/profile").authenticated()

                        // Restaurant Service - User/Admin endpoints (handled by controller-level
                        // checks)
                        .pathMatchers(HttpMethod.GET, "/restaurant-service/api/restaurants").authenticated()
                        .pathMatchers(HttpMethod.GET, "/restaurant-service/api/restaurant/{id}").authenticated()
                        .pathMatchers(HttpMethod.GET, "/restaurant-service/api/menu-items/{id}").authenticated()
                        .pathMatchers(HttpMethod.GET, "/restaurant-service/api/menu-items/category/**").authenticated()
                        .pathMatchers(HttpMethod.GET, "/restaurant-service/api/menu-items/restaurant/**")
                        .authenticated()

                        // Restaurant Service - Admin only endpoints
                        .pathMatchers(HttpMethod.POST, "/restaurant-service/api/restaurant").hasRole("Admin")
                        .pathMatchers(HttpMethod.PUT, "/restaurant-service/api/restaurant/{id}").hasRole("Admin")
                        .pathMatchers(HttpMethod.DELETE, "/restaurant-service/api/restaurant/{id}").hasRole("Admin")
                        .pathMatchers(HttpMethod.POST, "/restaurant-service/api/menu-items").hasRole("Admin")
                        .pathMatchers(HttpMethod.PUT, "/restaurant-service/api/menu-items/**").hasRole("Admin")
                        .pathMatchers(HttpMethod.DELETE, "/restaurant-service/api/menu-items/**").hasRole("Admin")

                        // Order Service - User/Admin endpoints (handled by controller-level checks)
                        .pathMatchers(HttpMethod.POST, "/order-service/api/orders").authenticated()
                        .pathMatchers(HttpMethod.GET, "/order-service/api/orders/**").authenticated()
                        .pathMatchers(HttpMethod.GET, "/order-service/api/orders/user/**").authenticated()
                        .pathMatchers(HttpMethod.GET, "/order-service/api/order-items/order/**").authenticated()

                        // Payment Service - Admin only endpoints
                        .pathMatchers(HttpMethod.GET, "/payment-service/api/payments/order/**").hasRole("Admin")

                        // Payment Service - User/Admin endpoints
                        .pathMatchers(HttpMethod.POST, "/payment-service/api/payments/process").authenticated()
                        .pathMatchers(HttpMethod.POST, "/payment-service/api/payments/initiate").authenticated()
                        .pathMatchers(HttpMethod.POST, "/payment-service/api/payments/confirm").authenticated()
                        .pathMatchers(HttpMethod.GET, "/payment-service/api/payments/{orderId}/status").authenticated()
                        .pathMatchers(HttpMethod.GET, "/payment-service/api/payments/order/**").authenticated()
                        .pathMatchers(HttpMethod.GET, "/payment-service/api/payments/{id}").authenticated()

                        // Payment Service - Admin only endpoints (restricted)
                        .pathMatchers(HttpMethod.GET, "/payment-service/api/payments/order/**").hasRole("Admin")
                        .pathMatchers(HttpMethod.PUT, "/payment-service/api/payments/{paymentId}/status")
                        .hasRole("Admin")

                        // // Flight Service - Public endpoints
                        // .pathMatchers(HttpMethod.GET, "/flight-service/api/flights").permitAll()
                        // .pathMatchers(HttpMethod.GET, "/flight-service/api/flight/**").permitAll()
                        //
                        // // Flight Service - Admin only endpoints
                        // .pathMatchers(HttpMethod.POST, "/flight-service/api/flight").hasRole("Admin")
                        // .pathMatchers(HttpMethod.PUT, "/flight-service/api/flight").hasRole("Admin")
                        // .pathMatchers(HttpMethod.DELETE,
                        // "/flight-service/api/flight/**").hasRole("Admin")
                        // .pathMatchers(HttpMethod.DELETE,
                        // "/flight-service/api/flights").hasRole("Admin")
                        //
                        // // Airport Service - Public endpoints
                        // .pathMatchers(HttpMethod.GET, "/airport-service/api/airports").permitAll()
                        // .pathMatchers(HttpMethod.GET, "/airport-service/api/airport/**").permitAll()
                        //
                        // // Airport Service - Admin only endpoints
                        // .pathMatchers(HttpMethod.POST,
                        // "/airport-service/api/airport").hasRole("Admin")
                        // .pathMatchers(HttpMethod.PUT,
                        // "/airport-service/api/airport").hasRole("Admin")
                        // .pathMatchers(HttpMethod.DELETE,
                        // "/airport-service/api/airport/**").hasRole("Admin")
                        //
                        // // Schedule Service - Public endpoints
                        // .pathMatchers(HttpMethod.GET, "/schedule-service/api/schedules").permitAll()
                        //
                        // // Schedule Service - Authenticated Endpoint
                        // .pathMatchers(HttpMethod.GET,"/schedule-service/api/schedule/**").authenticated()
                        //
                        // // Schedule Service - Admin only endpoints
                        // .pathMatchers(HttpMethod.POST,
                        // "/schedule-service/api/schedule").hasRole("Admin")
                        // .pathMatchers(HttpMethod.DELETE,
                        // "/schedule-service/api/schedules").hasRole("Admin")
                        // .pathMatchers(HttpMethod.DELETE,
                        // "/schedule-service/api/schedule/airport/**").hasRole("Admin")
                        // .pathMatchers(HttpMethod.DELETE,
                        // "/schedule-service/api/schedule/flight/**").hasRole("Admin")
                        // .pathMatchers(HttpMethod.GET,"/schedule-service/api/all-schedules").hasRole("Admin")
                        // .pathMatchers(HttpMethod.PUT,"/schedule-service/api/schedule").hasRole("Admin")

                        // Default policy - require authentication for any other endpoints
                        .anyExchange().authenticated())
                .addFilterBefore(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .build();
    }
}