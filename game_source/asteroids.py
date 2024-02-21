# Example file showing a circle moving on screen
import pygame

SCREEN_COLOR = (140, 107, 136)
SPEED_MULTIPLIERS = [1, 1.1, 1.2, 1.5, 1.7, 2]
BASE_SPEED = 300

def draw_speed_indicator(screen: pygame.Surface, speed_level: int): 
    # The top indicator will be placed in the top-right corner with a 20-pixel space above and to the right.
    # Top-right corner coordinates and side length
    top_right_x = screen.get_width() - 20
    top_right_y = 20
    side_length = 20
    
    spacing_between_indicators = 20
    
    # Calculate the top-left corner's position
    init_top_left_x = top_right_x - side_length
    init_top_left_y = top_right_y
            
    for i in range(0, speed_level):
        top_left_y = init_top_left_y + (2*i*spacing_between_indicators)
        rect = pygame.draw.rect(screen, (0, 0, 0), (init_top_left_x, top_left_y , side_length, side_length))



# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True
dt = 0
speed_level=0
player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            keys = pygame.key.get_pressed()
            if keys[pygame.K_UP] and speed_level < len(SPEED_MULTIPLIERS)-1:
                speed_level+=1
                print(SPEED_MULTIPLIERS[speed_level])
            if keys[pygame.K_DOWN] and speed_level > 0:
                speed_level-=1
                print(SPEED_MULTIPLIERS[speed_level])

    # fill the screen with a color to wipe away anything from last frame
    screen.fill(SCREEN_COLOR)

    pygame.draw.circle(screen, "red", player_pos, 40)
    draw_speed_indicator(screen, speed_level)

    VELOCITY = BASE_SPEED * SPEED_MULTIPLIERS[speed_level]

    keys = pygame.key.get_pressed()
    if keys[pygame.K_w]:
        player_pos.y -= VELOCITY * dt
    if keys[pygame.K_s]:
        player_pos.y += VELOCITY * dt
    if keys[pygame.K_a]:
        player_pos.x -= VELOCITY * dt
    if keys[pygame.K_d]:
        player_pos.x += VELOCITY * dt
 
    # flip() the display to put your work on screen
    pygame.display.flip()

    # limits FPS to 60
    # dt is delta time in seconds since last frame, used for framerate-
    # independent physics.
    dt = clock.tick(60) / 1000

pygame.quit()

