// src/services/alertService.js
import Swal from 'sweetalert2';

export const showDeleteConfirmation = async (callback) => {
    return Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
};

export const showEditConfirmation = async (callback) => {
    return Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Se modificará el producto!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
};

export const showSuccessAlert = (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: message
    });
};

export const showErrorAlert = (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    });
};


export const showExitSession = async (callback) => {
    return Swal.fire({
        title: '¿Estás seguro?',
        text: "La sesión se cerrará",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
};