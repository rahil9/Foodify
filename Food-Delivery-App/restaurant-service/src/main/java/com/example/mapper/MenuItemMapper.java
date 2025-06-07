package com.example.mapper;

import com.example.dto.MenuItemRequest;
import com.example.dto.MenuItemResponse;
import com.example.entity.MenuItem;
import com.example.entity.Restaurant;
import org.springframework.stereotype.Component;

@Component
public class MenuItemMapper {

    public MenuItem mapToModel(MenuItemRequest request, Restaurant restaurant) {
        return MenuItem.builder()
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .category(request.getCategory())
                .isVeg(request.isVeg())
                .image(request.getImage())
                .restaurant(restaurant)
                .build();
    }

    public MenuItemResponse mapToDTO(MenuItem menuItem) {
        return MenuItemResponse.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .price(menuItem.getPrice())
                .description(menuItem.getDescription())
                .category(menuItem.getCategory())
                .isVeg(menuItem.isVeg())
                .image(menuItem.getImage())
                .restaurantId(menuItem.getRestaurant().getId())
                .build();
    }
}