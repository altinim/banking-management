package com.bimi.bankingsystem.service;
import com.bimi.bankingsystem.model.User;
import com.bimi.bankingsystem.repository.UserRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service

public class UserServiceImpl implements UserService {


    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
       return userRepository.findById(id);
    }

    @Override
    public boolean deleteUser(Long id) {
       userRepository.deleteById(id);
       return true;
    }

    @Override
    public User updateUser(Long id, User user) {
        User u =
                userRepository.findById(id).get();
        u.setEmail(user.getEmail());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setPassword(user.getPassword());
        u.setPhoneNumber(user.getPhoneNumber());

        return userRepository.save(u);

    }
}
