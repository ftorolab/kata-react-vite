import { useState } from 'react';
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Collapse, ListItemButton
  } from '@mui/material';
  import PeopleIcon from '@mui/icons-material/People';
  import ComputerIcon from '@mui/icons-material/Computer';
  import LockIcon from '@mui/icons-material/Lock';
  import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
  import { Link } from 'react-router-dom';
  
  const drawerWidth = 240;
  
  export default function Sidebar() {
    const [openComputadores, setOpenComputadores] = useState(false);
    const [openAplicaciones, setOpenAplicaciones] = useState(false);
    const [openUsuarios, setOpenUsuarios] = useState(false);


    const handleComputadoresClick = () => {
        setOpenComputadores(!openComputadores);
    };
    const handleAplicacionesClick = () => {
        setOpenAplicaciones(!openAplicaciones);
    };
    const handleUsuariosClick = () => {
        setOpenUsuarios(!openUsuarios);
    };

    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton onClick={handleUsuariosClick}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Usuarios" />
            {openUsuarios ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
            <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItemButton component={Link} to="/">
                <ListItemText primary="Solicitud Usuarios" />
                </ListItemButton>
                <ListItemButton component={Link} to="/roles">
                <ListItemText primary="Gestión Roles" />
                </ListItemButton>
                <ListItemButton component={Link} to="/areas">
                <ListItemText primary="Gestión Áreas" />
                </ListItemButton>
                <ListItemButton component={Link} to="/estados">
                <ListItemText primary="Gestión Estados" />
                </ListItemButton>
            </List>
            </Collapse>

          <ListItemButton onClick={handleAplicacionesClick}>
          <ListItemIcon><LockIcon /></ListItemIcon>
          <ListItemText primary="Aplicaciones" />
            {openAplicaciones ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
            <Collapse in={openAplicaciones} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItemButton component={Link} to="/apps">
                <ListItemText primary="Aplicaciones" />
                </ListItemButton>
                <ListItemButton component={Link} to="/accesos">
                <ListItemText primary="Gestión Accesos" />
                </ListItemButton>
            </List>
            </Collapse>

          <ListItemButton onClick={handleComputadoresClick}>
          <ListItemIcon><ComputerIcon /></ListItemIcon>
          <ListItemText primary="Computadores" />
            {openComputadores ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
            <Collapse in={openComputadores} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItemButton component={Link} to="/computadores">
                <ListItemText primary="Equipos" />
                </ListItemButton>
                <ListItemButton component={Link} to="/asignaciones-pc">
                <ListItemText primary="Gestión Asignaciones" />
                </ListItemButton>
            </List>
            </Collapse>
        </List>
      </Drawer>
    );
  }
  