Feature: Login

  Scenario: Usuario admin inicia sesión correctamente
    Given el usuario abre la página de login
    When el usuario "pablo" introduce la contraseña "1234"
    And presiona el botón "Acceder"
    Then debería ver el dashboard
    And debería ver "pablo" en la parte superior derecha
    And debería ver el acceso a la sección de "Administración"
  
  Scenario: Usuario intenta iniciar sesión 
    Given el usuario abre la página de login
    When el usuario "gracia" introduce la contraseña "noesesta"
    When el usuario introduce credenciales inválidas
    And presiona el botón "Acceder"
    Then debería ver un mensaje de error

  Scenario: Usuario inicia sesión correctamente pero no tiene permisos para la administración
    Given el usuario abre la página de login
    When el usuario "gracia" introduce la contraseña "1234"
    And presiona el botón "Acceder"
    Then debería ver el dashboard
    And debería ver "gracia" en la parte superior derecha
    And no debería ver el acceso a la sección de "Administración"
