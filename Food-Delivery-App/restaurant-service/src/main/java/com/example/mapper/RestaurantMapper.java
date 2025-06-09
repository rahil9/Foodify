package com.example.mapper;

import com.example.dto.MenuItemRequest;
import com.example.dto.RestaurantRequest;
import com.example.dto.RestaurantResponse;
import com.example.entity.Restaurant;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class RestaurantMapper {
    private final MenuItemMapper menuItemMapper = new MenuItemMapper();

    public Restaurant toRestaurant(RestaurantRequest request) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setRating(request.getRating());
        restaurant.setAddress(request.getAddress());
        restaurant.setLocation(request.getLocation());
        restaurant.setCategory(request.getCategory());
        restaurant.setDescription(request.getDescription());
        restaurant.setMinOrderAmount(request.getMinOrderAmount());
        restaurant.setDeliveryTime(request.getDeliveryTime());
        restaurant.setImage(request.getImage());
        if (request.getMenuItems() != null) {
            restaurant.setMenuItems(request.getMenuItems().stream()
                    .map(menuItemRequest -> menuItemMapper.toMenuItem(menuItemRequest, restaurant))
                    .collect(Collectors.toList()));
        }
        return restaurant;
    }

    public RestaurantResponse toRestaurantResponse(Restaurant restaurant) {
        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getCategory(),
                restaurant.getAddress(),
                restaurant.getLocation(),
                restaurant.getRating(),
                restaurant.getDescription(),
                restaurant.getMinOrderAmount(),
                restaurant.getDeliveryTime(),
                restaurant.getImage());
    }
}
