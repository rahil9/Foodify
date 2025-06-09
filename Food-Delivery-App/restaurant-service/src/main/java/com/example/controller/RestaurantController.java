package com.example.controller;

import com.example.dto.RestaurantRequest;
import com.example.dto.RestaurantResponse;
import com.example.service.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    private final RestaurantService service;

    public RestaurantController(RestaurantService service) {
        this.service = service;
    }

    @PostMapping
    public RestaurantResponse createRestaurant(@RequestBody RestaurantRequest request) {
        return service.createRestaurant(request);
    }

    @GetMapping("/restaurants")
    public List<RestaurantResponse> getAllRestaurants() {
        return service.getAllRestaurants();
    }

    // Get restaurant by ID (Public)
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantResponse> getRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRestaurantById(id));
    }

    // Update restaurant details (Admin only)
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantResponse> updateRestaurant(
            @PathVariable Long id,
            @RequestBody RestaurantRequest request) {
        return ResponseEntity.ok(service.updateRestaurant(id, request));
    }

    // Delete a restaurant (Admin only)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        service.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }

}
