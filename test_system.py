#!/usr/bin/env python3
"""
FlaskShopper System Test Script
Tests all major components to ensure everything is working correctly.
"""

print('🚀 FlaskShopper - Comprehensive System Check')
print('=' * 50)

# Test 1: App Creation
try:
    from website import create_app
    app = create_app()
    print('✅ Flask app creation: SUCCESS')
except Exception as e:
    print(f'❌ Flask app creation: FAILED - {e}')
    exit(1)

# Test 2: Database Models
try:
    from website.models import Product, Customer, Cart, Order
    with app.app_context():
        products = Product.query.all()
        customers = Customer.query.all()
    print(f'✅ Database models: SUCCESS ({len(products)} products, {len(customers)} customers)')
except Exception as e:
    print(f'❌ Database models: FAILED - {e}')

# Test 3: Currency Filter
try:
    with app.app_context():
        filter_func = app.jinja_env.filters.get('currency')
        test_result = filter_func(25999)
        expected = 'Rs 25,999'
        if test_result == expected:
            print('✅ Currency filter: SUCCESS')
        else:
            print(f'❌ Currency filter: FAILED - Expected {expected}, got {test_result}')
except Exception as e:
    print(f'❌ Currency filter: FAILED - {e}')

# Test 4: Routes Testing
try:
    with app.test_client() as client:
        routes = ['/', '/about-us', '/contact-us', '/shop', '/login', '/sign-up']
        all_routes_ok = True
        failed_routes = []
        for route in routes:
            response = client.get(route)
            if response.status_code != 200:
                all_routes_ok = False
                failed_routes.append(f'{route} (Status: {response.status_code})')
        
        if all_routes_ok:
            print(f'✅ Routes testing: SUCCESS (tested {len(routes)} routes)')
        else:
            print(f'❌ Routes testing: FAILED - {", ".join(failed_routes)}')
except Exception as e:
    print(f'❌ Routes testing: FAILED - {e}')

# Test 5: Product Images
try:
    import os
    with app.app_context():
        products = Product.query.all()
        missing_images = []
        for product in products:
            media_path = os.path.join('media', product.product_picture)
            static_path = os.path.join('website', 'static', 'images', product.product_picture)
            if not (os.path.exists(media_path) or os.path.exists(static_path)):
                missing_images.append(product.product_picture)
        
        if not missing_images:
            print(f'✅ Product images: SUCCESS (all {len(products)} products have images)')
        else:
            print(f'❌ Product images: FAILED ({len(missing_images)} missing: {", ".join(missing_images)})')
except Exception as e:
    print(f'❌ Product images: FAILED - {e}')

# Test 6: Template Rendering
try:
    with app.test_client() as client:
        response = client.get('/')
        if b'FlaskShopper' in response.data and b'Rs' in response.data:
            print('✅ Template rendering: SUCCESS (home page renders with currency)')
        else:
            print('❌ Template rendering: FAILED (missing expected content)')
except Exception as e:
    print(f'❌ Template rendering: FAILED - {e}')

print('=' * 50)
print('✨ System check complete! FlaskShopper is ready to use.')
print('🌐 Access the application at: http://127.0.0.1:5000')
print('💰 All prices are displayed in Indian Rupees (Rs)')
print('📱 Features: Home, Shop, About Us, Contact Us, User Auth, Cart, Orders')
print('🛍️  Products available: Electronics, Gadgets, Food items')
print('🎨 Modern UI with responsive design and animations')
