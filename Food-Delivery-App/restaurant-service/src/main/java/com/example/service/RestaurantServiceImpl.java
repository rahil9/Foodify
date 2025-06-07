package com.example.service;

import com.example.dto.RestaurantRequest;
import com.example.dto.RestaurantResponse;
import com.example.entity.Restaurant;
import com.example.mapper.RestaurantMapper;
import com.example.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository repository;
    private final RestaurantMapper mapper;

    @Override
    public RestaurantResponse createRestaurant(RestaurantRequest request) {
        Restaurant restaurant = mapper.mapToModel(request);
        return mapper.mapToDTO(repository.save(restaurant));
    }

    @Override
    public List<RestaurantResponse> getAllRestaurants() {
        return repository.findAll().stream()
                .map(mapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RestaurantResponse getRestaurantById(Long id) {
        Restaurant restaurant = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        return mapper.mapToDTO(restaurant);
    }

    @Override
    @Transactional
    public RestaurantResponse updateRestaurant(Long id, RestaurantRequest request) {
        Restaurant restaurant = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Update fields
        restaurant.setName(request.getName());
        restaurant.setRating(request.getRating());
        restaurant.setAddress(request.getAddress());
        restaurant.setCategory(request.getCategory());
        restaurant.setDescription(request.getDescription());
        restaurant.setMinOrderAmount(request.getMinOrderAmount());
        restaurant.setDeliveryTime(request.getDeliveryTime());
        restaurant.setImage(request.getImage());

        return mapper.mapToDTO(repository.save(restaurant));
    }

    @Override
    public void deleteRestaurant(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Restaurant not found");
        }
        repository.deleteById(id);
    }
}

