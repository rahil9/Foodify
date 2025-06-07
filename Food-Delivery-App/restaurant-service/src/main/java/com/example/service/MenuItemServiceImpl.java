package com.example.service;

import com.example.dto.MenuItemRequest;
import com.example.dto.MenuItemResponse;
import com.example.entity.MenuItem;
import com.example.entity.Restaurant;
import com.example.mapper.MenuItemMapper;
import com.example.repository.MenuItemRepository;
import com.example.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {
    private final MenuItemRepository menuItemRepository;
    private final MenuItemMapper menuItemMapper;
    private final RestaurantRepository restaurantRepository;

    @Override
    public MenuItemResponse createMenuItem(MenuItemRequest request) {
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        MenuItem menuItem = menuItemMapper.mapToModel(request, restaurant);
        return menuItemMapper.mapToDTO(menuItemRepository.save(menuItem));
    }

    @Override
    public List<MenuItemResponse> getMenuItemsByCategory(String category) {
        return menuItemRepository.findByCategory(category)
                .stream()
                .map(menuItemMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MenuItemResponse> getMenuItemsByRestaurant(Long restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId)
                .stream()
                .map(menuItemMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemResponse getMenuItemById(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with ID: " + id));
        return menuItemMapper.mapToDTO(menuItem);
    }


    @Override
    public MenuItemResponse updateMenuItem(Long id, MenuItemRequest request) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("MenuItem not found"));

        menuItem.setName(request.getName());
        menuItem.setPrice(request.getPrice());
        menuItem.setDescription(request.getDescription());
        menuItem.setCategory(request.getCategory());
        menuItem.setVeg(request.isVeg());
        menuItem.setImage(request.getImage());

        return menuItemMapper.mapToDTO(menuItemRepository.save(menuItem));
    }

    @Override
    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}