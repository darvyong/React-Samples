import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CssBaseline, Box, Drawer, Toolbar, Typography, Divider } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from "@mui/icons-material/Home";
import GridOffIcon from '@mui/icons-material/GridOff';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = [{
    "key": "Home",
    "name": "Home",
    "link": "/",
    "icon": <HomeIcon />
}, {
    "key": "TodoList",
    "name": "Todo List",
    "link": "/todolist",
    "icon": <ChecklistIcon />
}, {
    "key": "TicTacToe",
    "name": "TicTacToe Game",
    "link": "/tictactoe",
    "icon": <GridOffIcon />
}, {
    "key": "Samples",
    "name": "Sample Implementations",
    "link": "/samples",
    "icon": <DesignServicesIcon />
}, {
    "key": "Products",
    "name": "Product List",
    "link": "/products",
    "icon": <ShoppingCartIcon />
}]

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
}));

interface NavItem {
    "key": string,
    "name": string,
    "link": string,
    "icon": JSX.Element,
}

export default function PersistentDrawerLeft({ content }: {
    content: JSX.Element;
}) {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<NavItem>(navItems[0]);

    function handleNavItemClick(item: NavItem) {
        setCurrentPage(item);
    }

    function handleDrawerToggle() {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}
                    sx={{ bgcolor: '#3B5998', width: 1, zIndex: "999999" }}>
                <Toolbar>
                <IconButton color="inherit" aria-label="open drawer"
                            onClick={handleDrawerToggle} edge="start"
                            // sx={{ mr: 2, ...(open && { display: "none" }) }}
                            sx={{ mr: 2 }} >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    { currentPage.name }
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={open}
                    sx={{ width: drawerWidth, flexShrink: 0,
                        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }} >
                <DrawerHeader/>
                <Divider />
                <List>
                    {navItems.map(item => (
                        <ListItem key={item.key} disablePadding>
                            <ListItemButton component={Link} to={item.link} 
                                            onClick={ () => handleNavItemClick(item) }>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.key} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {content}
            </Main>
        </Box>
    );
}
