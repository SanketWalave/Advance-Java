package com.sec.Security.inMemory.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {

        UserDetails admin = User.withUsername("admin")
                .password("admin123")
                .roles("ADMIN")
                .build();

        UserDetails user = User.withUsername("user")
                .password("user123")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers("/home/").permitAll()

                        // Home Controller (ADMIN only)
                        .requestMatchers("/home/addUser").hasRole("ADMIN")
                        .requestMatchers("/home/getAll").hasRole("ADMIN")
                        .requestMatchers("/home/*").hasRole("ADMIN")

                        // Books
                        .requestMatchers(HttpMethod.GET, "/books/**")
                        .hasAnyRole("USER", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/books/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/books/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/books/**")
                        .hasRole("ADMIN")

                        .anyRequest().authenticated()
                )

                .formLogin(Customizer.withDefaults())

                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}