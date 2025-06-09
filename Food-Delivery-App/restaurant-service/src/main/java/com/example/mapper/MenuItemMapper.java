package com.example.mapper;

import com.example.dto.MenuItemRequest;
import com.example.dto.MenuItemResponse;
import com.example.entity.MenuItem;
import com.example.entity.Restaurant;
import org.springframework.stereotype.Component;

@Component
public class MenuItemMapper {

    public MenuItem toMenuItem(MenuItemRequest request, Restaurant restaurant) {
        MenuItem menuItem = new MenuItem();
        menuItem.setName(request.getName());
        menuItem.setPrice(request.getPrice());
        menuItem.setDescription(request.getDescription());
        menuItem.setCategory(request.getCategory());
        menuItem.setVeg(request.isVeg());
        menuItem.setImage(request.getImage());
        menuItem.setRestaurant(restaurant);
        return menuItem;
    }

    public MenuItemResponse toMenuItemResponse(MenuItem menuItem) {
        return new MenuItemResponse(
                menuItem.getId(),
                menuItem.getName(),
                menuItem.getPrice(),
                menuItem.getDescription(),
                menuItem.getCategory(),
                menuItem.isVeg(),
                menuItem.getImage(),
                menuItem.getRestaurant().getId());
    }
}