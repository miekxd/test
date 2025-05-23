<?php
// This is your first PHP script for strata management!
// PHP starts with <?php tag

// Set the content type to HTML
header('Content-Type: text/html; charset=utf-8');

// PHP variables start with $
$buildingName = "StrataSphere Residential Complex";
$totalUnits = 45;
$currentDate = date('Y-m-d H:i:s');
$adminFee = 3200.00;

// Sample data for demonstration
$units = [
    ["number" => "101", "owner" => "Emma Thompson", "bedrooms" => 2, "fees_paid" => true],
    ["number" => "102", "owner" => "Michael Chen", "bedrooms" => 3, "fees_paid" => false],
    ["number" => "205", "owner" => "Sarah Rodriguez", "bedrooms" => 2, "fees_paid" => true],
    ["number" => "309", "owner" => "James Wilson", "bedrooms" => 1, "fees_paid" => false]
];

// Calculate some statistics
$totalOwners = count($units);
$paidCount = 0;
foreach($units as $unit) {
    if($unit['fees_paid']) {
        $paidCount++;
    }
}
$paymentRate = ($paidCount / $totalOwners) * 100;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $buildingName; ?> - Building Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 30px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .stat-value {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }
        .units-table {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        th {
            background-color: #f8f9fa;
            font-weight: bold;
        }
        .paid { color: #28a745; font-weight: bold; }
        .unpaid { color: #dc3545; font-weight: bold; }
        .php-info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            border-left: 4px solid #2196f3;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1><?php echo $buildingName; ?></h1>
        <p>Building Management Dashboard - Generated with PHP</p>
        <p><strong>Generated on:</strong> <?php echo $currentDate; ?></p>
    </div>

    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-value"><?php echo $totalUnits; ?></div>
            <div>Total Units</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">$<?php echo number_format($adminFee, 2); ?></div>
            <div>Quarterly Admin Fee</div>
        </div>
        <div class="stat-card">
            <div class="stat-value"><?php echo round($paymentRate); ?>%</div>
            <div>Payment Rate</div>
        </div>
        <div class="stat-card">
            <div class="stat-value"><?php echo $paidCount; ?>/<?php echo $totalOwners; ?></div>
            <div>Fees Paid</div>
        </div>
    </div>

    <div class="units-table">
        <h2 style="padding: 20px 20px 0; margin: 0;">Unit Information</h2>
        <table>
            <thead>
                <tr>
                    <th>Unit Number</th>
                    <th>Owner Name</th>
                    <th>Bedrooms</th>
                    <th>Fee Status</th>
                    <th>Quarterly Fee</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($units as $unit): ?>
                <tr>
                    <td>Unit <?php echo $unit['number']; ?></td>
                    <td><?php echo $unit['owner']; ?></td>
                    <td><?php echo $unit['bedrooms']; ?> bed<?php echo $unit['bedrooms'] > 1 ? 's' : ''; ?></td>
                    <td class="<?php echo $unit['fees_paid'] ? 'paid' : 'unpaid'; ?>">
                        <?php echo $unit['fees_paid'] ? 'PAID' : 'OUTSTANDING'; ?>
                    </td>
                    <td>$<?php echo number_format($adminFee, 2); ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <div class="php-info">
        <h3>🐘 PHP Information</h3>
        <p><strong>Server:</strong> <?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Vercel Serverless'; ?></p>
        <p><strong>PHP Version:</strong> <?php echo PHP_VERSION; ?></p>
        <p><strong>This page demonstrates:</strong></p>
        <ul>
            <li>PHP variables and data types</li>
            <li>Arrays and loops (foreach)</li>
            <li>Conditional statements (if/else)</li>
            <li>Date/time functions</li>
            <li>Mathematical calculations</li>
            <li>HTML generation from PHP data</li>
        </ul>
    </div>
</body>
</html>