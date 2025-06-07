package com.example.service;

import com.example.dto.MenuItemRequest;
import com.example.dto.MenuItemResponse;
import com.example.entity.MenuItem;
import com.example.entity.Restaurant;
import com.example.enums.MenuCategory;
import com.example.mapper.MenuItemMapper;
import com.example.repository.MenuItemRepository;
import com.example.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

public interface MenuItemService {
    MenuItemResponse createMenuItem(MenuItemRequest request);
    MenuItemResponse getMenuItemById(Long id);
    List<MenuItemResponse> getMenuItemsByCategory(String category);
    List<MenuItemResponse> getMenuItemsByRestaurant(Long restaurantId);
    MenuItemResponse updateMenuItem(Long id, MenuItemRequest request);
    void deleteMenuItem(Long id);
}
