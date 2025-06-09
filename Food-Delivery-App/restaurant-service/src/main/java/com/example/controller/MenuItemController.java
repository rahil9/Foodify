package com.example.controller;

import com.example.dto.DTO;
import com.example.dto.MenuItemRequest;
import com.example.dto.MenuItemResponse;
import com.example.service.MenuItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {
    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @PostMapping
    public ResponseEntity<DTO<MenuItemResponse>> createMenuItem(@RequestBody MenuItemRequest request) {
        MenuItemResponse menuItem = menuItemService.createMenuItem(request);
        return ResponseEntity.ok(new DTO<>(true,
                "Menu item created successfully",
                menuItem));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DTO<MenuItemResponse>> getMenuItemById(@PathVariable Long id) {
        MenuItemResponse menuItem = menuItemService.getMenuItemById(id);
        return ResponseEntity.ok(new DTO<>(true,
                "Menu item fetched successfully by ID",
                menuItem));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<DTO<List<MenuItemResponse>>> getMenuItemsByCategory(@PathVariable String category) {
        List<MenuItemResponse> menuItems = menuItemService.getMenuItemsByCategory(category);
        return ResponseEntity.ok(new DTO<>(true,
                "Menu items fetched successfully by category",
                menuItems));
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<DTO<List<MenuItemResponse>>> getMenuItemsByRestaurant(@PathVariable Long restaurantId) {
        List<MenuItemResponse> menuItems = menuItemService.getMenuItemsByRestaurant(restaurantId);
        return ResponseEntity.ok(new DTO<>(true,
                "Menu items fetched successfully by restaurant",
                menuItems));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DTO<MenuItemResponse>> updateMenuItem(
            @PathVariable Long id,
            @RequestBody MenuItemRequest request) {
        MenuItemResponse menuItem = menuItemService.updateMenuItem(id, request);
        return ResponseEntity.ok(new DTO<>(true,
                "Menu item updated successfully",
                menuItem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DTO<Void>> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.ok(new DTO<>(true,
                "Menu item deleted successfully",
                null));
    }
}
