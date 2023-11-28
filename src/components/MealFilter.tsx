import { useState, MouseEvent } from 'react';
import { Button, Menu, MenuItem, TextField, FormControlLabel, Switch, Select, InputLabel, FormControl } from '@mui/material';


type MealFilterProps = {
    onFilterSubmit: (filters: { title: string, isFavorite: boolean, type: string }) => void;
};

const MealFilter = ({ onFilterSubmit }: MealFilterProps) => {
    const [filterMenuToggle, setFilterMenuToggle] = useState<null | HTMLElement>(null);
    const [titleFilter, setTitleFilter] = useState<string>('');
    const [isFavoriteFilter, setIsFavoriteFilter] = useState<boolean>(false);
    const [typeFilter, setTypeFilter] = useState<string>('');

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setFilterMenuToggle(event.currentTarget);
    };

    const handleClose = () => {
        setFilterMenuToggle(null);
    };

    const handleSubmit = () => {
        onFilterSubmit({
            title: titleFilter,
            isFavorite: isFavoriteFilter,
            type: typeFilter
        });
        handleClose();
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Filters
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={filterMenuToggle}
                keepMounted
                open={Boolean(filterMenuToggle)}
                onClose={handleClose}
            >
                <MenuItem>
                    <TextField 
                        label="Title" 
                        name="title" 
                        value={titleFilter} 
                        onChange={(e) => setTitleFilter(e.target.value)} 
                    />
                </MenuItem>
                <MenuItem>
                    <FormControlLabel 
                        control={<Switch checked={isFavoriteFilter} onChange={(e) => setIsFavoriteFilter(e.target.checked)} name="isFavorite" />} 
                        label="Favorite" 
                    />
                </MenuItem>
                <MenuItem>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="type"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="breakfast">Breakfast</MenuItem>
                            <MenuItem value="lunch">Lunch</MenuItem>
                            <MenuItem value="dinner">Dinner</MenuItem>
                            <MenuItem value="snack">Snack</MenuItem>
                        </Select>
                    </FormControl>
                </MenuItem>
                <MenuItem>
                    <Button onClick={handleSubmit}>Apply Filters</Button>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default MealFilter;
