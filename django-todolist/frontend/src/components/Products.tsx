import { Checkbox, FormControl, FormControlLabel, FormGroup, Input, InputLabel, OutlinedInput, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

function ProductCategoryRow({ category } : {
    category: string }) {
    return (
        <TableRow>
            <TableCell align="center" colSpan={2} >
                {category}
            </TableCell>
        </TableRow>
    );
}
  
function ProductRow({ product } : {
    product: ProductProps }) {
    const name = product.stocked ? product.name :
        <span style={{ color: 'red' }}>
            {product.name}
        </span>;

    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{product.price}</TableCell>
        </TableRow>
    );
}
  
function ProductTable({ products } : {
    products: ProductProps[] }) {
    const rows = [
        <ProductCategoryRow category={products[0].category}
                            key={products[0].category} />
    ];
    let lastCategory: string = products[0].category;
  
    products.forEach((product) => {
        if (product.category !== lastCategory) {
            rows.push(<ProductCategoryRow category={product.category}
                                          key={product.category} />
            );
        }
        rows.push(
            <ProductRow product={product}
                        key={product.name} />
        );
        lastCategory = product.category;
    });
  
    return (
        <Table sx={{ width:0.5 }}>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}
            </TableBody>
        </Table>
    );
}
  
function SearchBar() {
    return (
        <FormGroup>
            <FormControl sx={{ width: 0.5 }}>
                <InputLabel htmlFor="component-outlined">Search</InputLabel>
                <OutlinedInput id="component-outlined"
                               label="Search" />
            </FormControl>
            <FormControlLabel control={<Checkbox defaultChecked />} 
                              label="Only show products in stock" />
        </FormGroup>
    );
}
  
function FilterableProductTable({ products } : {
    products: ProductProps[] } ) {
    return (
        <div>
            <SearchBar />
            <ProductTable products={products} />
        </div>
    );
}

interface ProductProps {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
}
  
const PRODUCTS: ProductProps[] = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];
  
function Products() {
    return <FilterableProductTable products={PRODUCTS} />;
}

export default Products;
  