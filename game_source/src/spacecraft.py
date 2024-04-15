import math
import pygame


class Spacecraft:
    def __init__(self, initial_position: pygame.Vector2, screen_size: tuple[int, int], initial_rotation=0, ):
        self.position = initial_position
        self.velocity = pygame.Vector2(0, 0)  # Initial velocity is zero
        self.rotation = math.radians(initial_rotation)  # Convert rotation to radians
        self.spacecraft_lines_points = [(0, 28), (9, 0), (18, 28), (9, 23)]
        self.scale_factor = 1.5
        self.speed = 300  # Speed in pixels per secon
        self.friction = 0.99  # Friction coefficient; closer to 1 is less friction, closer to 0 is more friction
        self.braking_friction = 0.975  # Increased friction when braking
        self.screen_size = screen_size
        self.spacecraft_lines_points = Spacecraft.scale_points(self.spacecraft_lines_points, 1.8)
        self.spacecraft_surface = self.create_spacecraft_surface()


    def draw(self, screen: pygame.Surface):
        pivot = Spacecraft.polygon_centroid(self.spacecraft_lines_points)
        Spacecraft.blitRotate(screen, self.spacecraft_surface, tuple(self.position), pivot, math.degrees(self.rotation))
        self.draw_ghosts(screen)

    def blitRotate(surf: pygame.Surface, spacecraft_surface: pygame.Surface, origin: tuple[int, int], pivot: tuple[int, int], angle):
        # offset from pivot to center
        image_rect = spacecraft_surface.get_rect(topleft = (origin[0] - pivot[0], origin[1]-pivot[1]))
        offset_center_to_pivot = pygame.math.Vector2(origin) - image_rect.center

        # roatated offset from pivot to center
        rotated_offset = offset_center_to_pivot.rotate(-angle)

        # roatetd image center
        rotated_image_center = (origin[0] - rotated_offset.x, origin[1] - rotated_offset.y)
        
        # get a rotated image 
        rotated_image = pygame.transform.rotate(spacecraft_surface, angle)
        
        rotated_image_rect = rotated_image.get_rect(center = rotated_image_center)
        

        # rotate and blit the image
        surf.blit(rotated_image, rotated_image_rect)


    def update(self, dt: float, events: list[pygame.event.Event]):
        pressed_keys = pygame.key.get_pressed()
        rotation_speed = 2.4  # radians per second

        if pressed_keys[pygame.K_a]:
            self.rotation += rotation_speed * dt
        if pressed_keys[pygame.K_d]:
            self.rotation -= rotation_speed * dt

        if pressed_keys[pygame.K_w]:
            self.velocity += pygame.Vector2(-math.sin(self.rotation), -math.cos(self.rotation)) * self.speed * dt
        if pressed_keys[pygame.K_s]:
            self.velocity -= pygame.Vector2(-math.sin(self.rotation), -math.cos(self.rotation)) * self.speed * dt

        # Apply braking friction or normal friction
        if pressed_keys[pygame.K_s]:
            # Apply stronger friction to simulate braking without reversing
            self.velocity *= self.braking_friction
        else:
            # Apply normal friction
            self.velocity *= self.friction

        # Update position based on velocity
        self.position += self.velocity * dt

        self.position.x %= self.screen_size[0]
        self.position.y %= self.screen_size[1]


    def draw_ghosts(self, screen):
        margin = max(self.spacecraft_surface.get_width(), self.spacecraft_surface.get_height())
        positions = [self.position]

        # Check horizontal proximity to edge
        if self.position.x < margin:
            positions.append(pygame.Vector2(self.position.x + self.screen_size[0], self.position.y))
        elif self.position.x > self.screen_size[0] - margin:
            positions.append(pygame.Vector2(self.position.x - self.screen_size[0], self.position.y))

        # Check vertical proximity to edge
        if self.position.y < margin:
            positions.append(pygame.Vector2(self.position.x, self.position.y + self.screen_size[1]))
        elif self.position.y > self.screen_size[1] - margin:
            positions.append(pygame.Vector2(self.position.x, self.position.y - self.screen_size[1]))

        # Draw spacecraft at all calculated positions
        for pos in positions:
            Spacecraft.blitRotate(screen, self.spacecraft_surface, pos, Spacecraft.polygon_centroid(self.spacecraft_lines_points), math.degrees(self.rotation))

    

    @staticmethod
    def scale_points(points, scale_factor):
        """ Scale a list of (x, y) points by a given factor """
        return [(x * scale_factor, y * scale_factor) for (x, y) in points]


    def find_surface_size(points):
        """ Find the width and height needed to encompass all points """
        max_x = max(point[0] for point in points)
        max_y = max(point[1] for point in points)
        return (max_x+1, max_y+1)


    @staticmethod
    def polygon_centroid(points):
        if not points:
            return None  # Return None if points list is empty

        # Close the polygon by repeating the first point at the end
        closed_points = points + [points[0]]

        # Calculate the signed area of the polygon
        A = 0.5 * sum(x0 * y1 - x1 * y0 for (x0, y0), (x1, y1) in zip(closed_points[:-1], closed_points[1:]))
        if A == 0:
            return None  # Degenerate polygon with area 0

        # Calculate the centroid coordinates
        Cx = (1 / (6 * A)) * sum((x0 + x1) * (x0 * y1 - x1 * y0) for (x0, y0), (x1, y1) in zip(closed_points[:-1], closed_points[1:]))
        Cy = (1 / (6 * A)) * sum((y0 + y1) * (x0 * y1 - x1 * y0) for (x0, y0), (x1, y1) in zip(closed_points[:-1], closed_points[1:]))
        
        return (Cx, Cy)


    def create_spacecraft_surface(self):
        spacecraft_surface = pygame.Surface((Spacecraft.find_surface_size(self.spacecraft_lines_points)), pygame.SRCALPHA)
        spacecraft_color = pygame.Color(255, 255, 255)

        pygame.draw.lines(spacecraft_surface, spacecraft_color,
                          True, self.spacecraft_lines_points, width=2)

        return spacecraft_surface
