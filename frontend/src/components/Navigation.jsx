import React from 'react'
import { Menubar } from 'primereact/menubar';
import timeicon from '../assets/icon/time.svg'
import {Button} from 'primereact/button';        
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation() {

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];

    return (
        <div>
            <Menubar 
                start={<a href="/"><img src={timeicon} width={50} /></a>}
                end={<>
                    <Link to="/login"><Button className='p-button-info p-button-sm' label='Login' text /></Link>
                    <Button className='p-button-info p-button-sm' label='SignUp' text />
                </>} 
                model={items} 
                
            />
        </div>
    )
}

export default Navigation