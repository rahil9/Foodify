package com.example.mapper;

import com.example.dto.RestaurantRequest;
import com.example.dto.RestaurantResponse;
import com.example.entity.Restaurant;
import org.springframework.stereotype.Component;

@Component
public class RestaurantMapper {

    public Restaurant mapToModel(RestaurantRequest request) {
        return Restaurant.builder()
                .name(request.getName())
                .rating(request.getRating())
                .address(request.getAddress())
                .location(request.getLocation())
                .category(request.getCategory())
                .description(request.getDescription())
                .minOrderAmount(request.getMinOrderAmount())
                .deliveryTime(request.getDeliveryTime())
                .image(request.getImage())
                .build();
    }

    public RestaurantResponse mapToDTO(Restaurant restaurant) {
        return RestaurantResponse.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .rating(restaurant.getRating())
                .address(restaurant.getAddress())
                .location(restaurant.getLocation())
                .category(restaurant.getCategory())
                .description(restaurant.getDescription())
                .minOrderAmount(restaurant.getMinOrderAmount())
                .deliveryTime(restaurant.getDeliveryTime())
                .image(restaurant.getImage())
                .build();
    }
}
