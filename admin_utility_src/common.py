def geometry_string_to_center_window(screen_width: int, screen_height: int) -> str:
    window_height = 600
    window_width = 800

    x_coordinate = int((screen_width / 2) - (window_width / 2))
    y_coordinate = int((screen_height / 2) - (window_height / 2))

    return "{}x{}+{}+{}".format(window_width,
                                window_height, x_coordinate, y_coordinate)