package com.example.service;

import com.example.dto.RestaurantRequest;
import com.example.dto.RestaurantResponse;

import java.util.List;

public interface RestaurantService {
    RestaurantResponse createRestaurant(RestaurantRequest request);
    List<RestaurantResponse> getAllRestaurants();
    RestaurantResponse getRestaurantById(Long id);
    RestaurantResponse updateRestaurant(Long id, RestaurantRequest request);
    void deleteRestaurant(Long id);
}
