import os
from PIL import Image, ImageDraw, ImageFont

def draw_globe_and_ring(draw_text=False):
    canvas_size = 512
    final_size = 256
    cx, cy, r = canvas_size//2, canvas_size//2, 85

    # Globe
    globe = Image.new('RGBA', (canvas_size, canvas_size), (0,0,0,0))
    g_draw = ImageDraw.Draw(globe)
    for radius in range(r, 0, -1):
        shift = 30 * (1 - radius/r)
        ox = cx - shift
        oy = cy - shift
        ratio = radius / r
        color = (
            int(20 - 20 * ratio),
            int(100 - 100 * ratio),
            int(255 - 80 * ratio),
            255
        )
        g_draw.ellipse((ox - radius, oy - radius, ox + radius, oy + radius), fill=color)

    # Back Canvas gets the entire ring
    back_canvas = Image.new('RGBA', (canvas_size, canvas_size), (0,0,0,0))
    b_draw = ImageDraw.Draw(back_canvas)
    b_draw.arc((cx-120, cy-70, cx+120, cy+70), start=0, end=360, fill="#FFCC00", width=22)
    b_draw.arc((cx-115, cy-65, cx+115, cy+65), start=0, end=360, fill="#E6A800", width=8)
    back_canvas = back_canvas.rotate(25, resample=Image.BICUBIC)

    # Front Canvas gets only the bottom half
    front_canvas = Image.new('RGBA', (canvas_size, canvas_size), (0,0,0,0))
    f_draw = ImageDraw.Draw(front_canvas)
    f_draw.arc((cx-120, cy-70, cx+120, cy+70), start=0, end=180, fill="#FFCC00", width=22)
    f_draw.arc((cx-115, cy-65, cx+115, cy+65), start=0, end=180, fill="#E6A800", width=8)
    front_canvas = front_canvas.rotate(25, resample=Image.BICUBIC)

    final = Image.alpha_composite(back_canvas, globe)

    if draw_text:
        text_canvas = Image.new('RGBA', (canvas_size, canvas_size), (0,0,0,0))
        t_draw = ImageDraw.Draw(text_canvas)

        font_paths = [
            "/System/Library/Fonts/Supplemental/Arial Black.ttf",
            "/System/Library/Fonts/Supplemental/Impact.ttf",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/Library/Fonts/Arial Bold.ttf"
        ]
        font = None
        for fp in font_paths:
            if os.path.exists(fp):
                try:
                    font = ImageFont.truetype(fp, 90)
                    break
                except:
                    pass
        if font is None:
            font = ImageFont.load_default()

        text = "ІПЗ"
        try:
            bbox = font.getbbox(text)
            w = bbox[2] - bbox[0]
            h = bbox[3] - bbox[1]
        except:
            w, h = t_draw.textsize(text, font=font)

        tx = (canvas_size - w) / 2
        ty = (canvas_size - h) / 2 - 30

        # Outline
        outline_color = (0, 0, 50, 255)
        for dx in [-3, 3]:
            for dy in [-3, 3]:
                t_draw.text((tx+dx, ty+dy), text, font=font, fill=outline_color)
        
        # Shadow
        t_draw.text((tx+7, ty+7), text, font=font, fill=(0, 0, 70, 255))
        
        # Main text
        t_draw.text((tx, ty), text, font=font, fill=(255, 255, 255, 255))
        final = Image.alpha_composite(final, text_canvas)

    final = Image.alpha_composite(final, front_canvas)

    left = (canvas_size - final_size) / 2
    top = (canvas_size - final_size) / 2
    right = (canvas_size + final_size) / 2
    bottom = (canvas_size + final_size) / 2
    final_cropped = final.crop((left, top, right, bottom))

    small = final_cropped.resize((80, 80), Image.NEAREST)
    return small.resize((256, 256), Image.NEAREST)

if __name__ == "__main__":
    os.makedirs("apps/frontend/public/images", exist_ok=True)
    
    main_logo = draw_globe_and_ring(draw_text=True)
    main_logo.save("apps/frontend/public/images/logo.png")
    
    favicon = draw_globe_and_ring(draw_text=False)
    favicon.save("apps/frontend/app/icon.png")

