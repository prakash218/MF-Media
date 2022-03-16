import pygame
import sys
import pygame_gui as pgui

pygame.init()
WIDTH  = 1200
HEIGHT = 800
FPS    = 60
LEFT_LEVER = pygame.image.load('left_lever.jpeg')
RIGHT_LEVER = pygame.image.load('right_lever.jpeg')

screen = pygame.display.set_mode((WIDTH,HEIGHT))
clock  = pygame.time.Clock()

RUNNING = False


def draw_screen(screen):
    pygame.draw.rect(screen, (100, 100, 100), (10, 10, WIDTH - 20, HEIGHT // 2),0)


def draw_track(screen):
    THICKNESS = 5
    Y_OFFSET = 50
    pygame.draw.line(screen, (0,0,0),(20, HEIGHT//4 + Y_OFFSET),(WIDTH - 20, HEIGHT // 4 + Y_OFFSET), THICKNESS)
    pygame.draw.line(screen, (0,0,0),(WIDTH // 2, HEIGHT // 4 + Y_OFFSET), (WIDTH // 2 + 150, HEIGHT // 4 - 200 + Y_OFFSET), THICKNESS + 2)
    pygame.draw.line(screen, (0,0,0), (WIDTH // 2 + 150, HEIGHT // 4 - 200 + Y_OFFSET), (WIDTH - 20, HEIGHT // 4 - 200 + Y_OFFSET), THICKNESS)

def draw_lever(screen, x, y):
    # pygame.draw.rect(screen, (255,255,255), (x,y,100, 200))
    screen.blit(LEFT_LEVER, (x, y, 100, 200))

def draw_stopper(screen):
    pygame.draw.rect(screen, (255,0, 0), (WIDTH // 2 - 30, HEIGHT // 2 + 30, 50, 50))
    pygame.draw.circle(screen, (255, 255, 255), (WIDTH // 2 - 5, HEIGHT // 2 + 55), 20)

def draw_buttons(screen, x, y):
    pygame.draw.circle(screen, (255, 255, 255), (x, y), 10)
    pygame.draw.circle(screen, (0, 0, 0), (x, y), 10, 1)
    pygame.draw.circle(screen, (0, 0, 0), (x, y), 5)

def draw_lights(screen, x, y):
    pass

while not RUNNING:

    screen.fill((0, 0, 0))
  
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    
    # Update.
    
    # Draw.
    draw_screen(screen)
    draw_track(screen)
    for i in range(5):
        draw_lever(screen, x = 60 + (i * 240), y = int(HEIGHT * (3 / 4)) - 50)
        
    for i in range(8):
        draw_buttons(screen, x = (i * 200) + 60, y = int(HEIGHT * (1 / 2)) - 50)
    
    draw_stopper(screen)
    
    pygame.display.flip()
    clock.tick(FPS)