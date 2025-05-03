package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "logs")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "logs_id_gen")
    @SequenceGenerator(name = "logs_id_gen", sequenceName = "logs_log_id_seq", allocationSize = 1)
    @Column(name = "log_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private com.example.demo.entities.User user;

    @Column(name = "action", length = Integer.MAX_VALUE)
    private String action;

    @Column(name = "triggered_at")
    private Instant triggeredAt;

}