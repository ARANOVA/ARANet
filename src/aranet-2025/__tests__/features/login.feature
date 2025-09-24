Feature: Login

  Scenario: Usuario inicia sesión correctamente
    Given el usuario abre la página de login
    When el usuario introduce su email y contraseña
    And presiona el botón "Entrar"
    Then debería ver su panel de control
