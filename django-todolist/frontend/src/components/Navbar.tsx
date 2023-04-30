import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, Button } from "@mui/material";
import { List, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from "@mui/icons-material/Today";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 240;
const navItems = [{
        "key": "Home",
        "link": "/",
        "icon": <HomeIcon />,
    }, {
        "key": "Todolist",
        "link": "/todolist",
        "icon": <TodayIcon />,
    }]

function Navbar({window, content}: {
    window?: () => Window;
    content: JSX.Element;
}) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Toolbar />
            <List>
                {navItems.map(item => (
                    <ListItemButton key={item.key} component={Link} to={item.link} >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.key} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav"
                    sx={{ bgcolor: '#3B5998', zIndex: "999999" }} >
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { md: "none" } }} >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div"
                                sx={{ flexGrow: 1 }}>
                        Darvy's React Portal
                    </Typography>
                    <Box sx={{ display: { sm: 'none', md: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.key} sx={{ color: '#fff' }}
                                    component={Link} to={item.link} >
                                {item.key}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav" aria-label="menu tasks" >
                <Drawer container={container} variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { sm: "block", md: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth
                            }
                        }} >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                {content}
            </Box>
        </Box>
    );
}

Navbar.propTypes = {
    window: PropTypes.func
};

export default Navbar;