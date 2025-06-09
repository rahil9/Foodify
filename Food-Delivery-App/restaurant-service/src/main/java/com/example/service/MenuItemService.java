package com.example.service;

import com.example.dto.MenuItemRequest;
import com.example.dto.MenuItemResponse;

import java.util.List;

public interface MenuItemService {
    MenuItemResponse createMenuItem(MenuItemRequest request);
    MenuItemResponse getMenuItemById(Long id);
    List<MenuItemResponse> getMenuItemsByCategory(String category);
    List<MenuItemResponse> getMenuItemsByRestaurant(Long restaurantId);
    MenuItemResponse updateMenuItem(Long id, MenuItemRequest request);
    void deleteMenuItem(Long id);
}
