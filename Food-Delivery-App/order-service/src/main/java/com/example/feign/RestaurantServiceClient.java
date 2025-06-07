package com.example.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "restaurant-service")
public interface RestaurantServiceClient {
    @GetMapping("/api/restaurants/{restaurantId}")
    Object getRestaurant(@PathVariable("restaurantId") Long restaurantId, @RequestHeader("Authorization") String token);
} 