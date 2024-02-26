import pygame

class SpeedIndicator:
    """
    A class to display a speed indicator as a series of squares on a Pygame screen,
    where each square represents a unit of speed.
    
    Attributes:
        indicator_rect (pygame.Rect): The rectangle defining the first indicator square's position and size.
        level (int): The current speed level, determining the number of squares to display.
    """
    
    def __init__(self, position, initial_speed_level=0):
        """
        Initializes a SpeedIndicator object.
        
        Args:
            position (tuple): The (x, y) coordinates of the indicator's top right corner.
            initial_speed_level (int): The speed level at which to start. Defaults to 0.
        """
        side_length = 20  # The length of each side of the indicator squares.
        
        # Calculate the top-left corner from the given top-right corner position.
        top_left_x = position[0] - side_length
        top_left_y = position[1]
        
        # Initialize the Rect object for the first indicator square.
        self.indicator_rect = pygame.Rect(top_left_x, top_left_y, side_length, side_length)
        self.level = initial_speed_level
    
    def increase_speed(self):
        """Increases the speed level by one."""
        self.level += 1
        
    def decrease_speed(self):
        """Decreases the speed level by one, ensuring it doesn't go below zero."""
        self.level = max(0, self.level - 1)
    
    def draw(self, screen: pygame.Surface):
        """
        Draws the speed indicator on the provided screen.
        
        Args:
            screen (pygame.Surface): The Pygame surface where the indicator should be drawn.
        """
        spacing = 20  # Vertical spacing between each indicator square.
        
        for i in range(self.level):
            # Calculate the Y position for the current square.
            current_rect = self.indicator_rect.move(0, i * 2 * spacing)
            
            # Draw the square on the screen in black.
            pygame.draw.rect(screen, (0, 0, 0), current_rect)
