package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "addresses_id_gen")
    @SequenceGenerator(name = "addresses_id_gen", sequenceName = "addresses_address_id_seq", allocationSize = 1)
    @Column(name = "address_id", nullable = false)
    private Integer id;

    @Column(name = "country", length = Integer.MAX_VALUE)
    private String country;

    @Column(name = "region", length = Integer.MAX_VALUE)
    private String region;

    @Column(name = "city", length = Integer.MAX_VALUE)
    private String city;

    @Column(name = "street", length = Integer.MAX_VALUE)
    private String street;

    @Column(name = "street_number")
    private Integer streetNumber;

}