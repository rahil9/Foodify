package com.example.controller;

import com.example.dto.DTO;
import com.example.dto.MenuItemRequest;
import com.example.dto.MenuItemResponse;
import com.example.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
@RequiredArgsConstructor
public class MenuItemController {
    private final MenuItemService menuItemService;

    @PostMapping
    public ResponseEntity<DTO<MenuItemResponse>> createMenuItem(@RequestBody MenuItemRequest request) {
        MenuItemResponse menuItem = menuItemService.createMenuItem(request);
        return ResponseEntity.ok(DTO.<MenuItemResponse>builder()
                .success(true)
                .message("Menu item created successfully")
                .data(menuItem)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DTO<MenuItemResponse>> getMenuItemById(@PathVariable Long id) {
        MenuItemResponse menuItem = menuItemService.getMenuItemById(id);
        return ResponseEntity.ok(DTO.<MenuItemResponse>builder()
                .success(true)
                .message("Menu item fetched successfully by ID")
                .data(menuItem)
                .build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<DTO<List<MenuItemResponse>>> getMenuItemsByCategory(@PathVariable String category) {
        List<MenuItemResponse> menuItems = menuItemService.getMenuItemsByCategory(category);
        return ResponseEntity.ok(DTO.<List<MenuItemResponse>>builder()
                .success(true)
                .message("Menu items fetched successfully by category")
                .data(menuItems)
                .build());
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<DTO<List<MenuItemResponse>>> getMenuItemsByRestaurant(@PathVariable Long restaurantId) {
        List<MenuItemResponse> menuItems = menuItemService.getMenuItemsByRestaurant(restaurantId);
        return ResponseEntity.ok(DTO.<List<MenuItemResponse>>builder()
                .success(true)
                .message("Menu items fetched successfully by restaurant")
                .data(menuItems)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DTO<MenuItemResponse>> updateMenuItem(
            @PathVariable Long id,
            @RequestBody MenuItemRequest request) {
        MenuItemResponse menuItem = menuItemService.updateMenuItem(id, request);
        return ResponseEntity.ok(DTO.<MenuItemResponse>builder()
                .success(true)
                .message("Menu item updated successfully")
                .data(menuItem)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DTO<Void>> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.ok(DTO.<Void>builder()
                .success(true)
                .message("Menu item deleted successfully")
                .build());
    }
}
