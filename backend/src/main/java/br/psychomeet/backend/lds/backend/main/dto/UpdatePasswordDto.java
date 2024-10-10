package br.psychomeet.backend.lds.backend.main.dto;

import lombok.Data;
@Data

public class UpdatePasswordDto {

    private String  id;

    private String oldPassword;

    private String newPassword;
}
