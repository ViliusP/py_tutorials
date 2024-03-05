import pygame


class Spacecraft:
    def __init__(self):
        self.spacecraft_surface = Spacecraft.create_spacecraft_surface()
        pass

    def draw(self, screen: pygame.Surface):
        screen.blit(self.spacecraft_surface, (0, 0))

    def create_spacecraft_surface():
        spacecraft_surface = pygame.Surface((20, 31))
        spacecraft_color = pygame.Color(255, 255, 255)
        lines_points = [(0, 28), (9, 0), (18, 28), (9, 21)]

        pygame.draw.lines(spacecraft_surface, spacecraft_color,
                          True, lines_points, width=2)

        return spacecraft_surface
