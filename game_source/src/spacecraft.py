import pygame


class Spacecraft:
    def __init__(self, initial_position: pygame.Vector2, intial_rotation=0):
        self.position = initial_position
        self.rotation = intial_rotation

        self.spacecraft_surface = Spacecraft.create_spacecraft_surface()

    def draw(self, screen: pygame.Surface):
        rotated_surface = pygame.transform.rotate(
            self.spacecraft_surface, self.rotation)
        
        scaled_surface = pygame.transform.scale_by(rotated_surface, 2)

        screen.blit(scaled_surface, self.position)

    def update(self, dt: float, events: list[pygame.event.Event]):
        pressed_keys = pygame.key.get_pressed()

        if pressed_keys[pygame.K_a]:
            self.rotation = self.rotation + 140 * dt
        if pressed_keys[pygame.K_d]:
            self.rotation = self.rotation - 140 * dt
        if pressed_keys[pygame.K_w]:
            self.position.y = self.position.y - 300 * dt
        if pressed_keys[pygame.K_s]:
            self.position.y = self.position.y + 300 * dt


    def create_spacecraft_surface():
        spacecraft_surface = pygame.Surface((20, 31), pygame.SRCALPHA)
        # spacecraft_surface.fill("red")
        spacecraft_color = pygame.Color(255, 255, 255)
        lines_points = [(0, 28), (9, 0), (18, 28), (9, 21)]

        pygame.draw.lines(spacecraft_surface, spacecraft_color,
                          True, lines_points, width=2)

        return spacecraft_surface
