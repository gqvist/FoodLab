namespace FoodLab.Utilities;

public static class MeasurementUnits
{
    private static readonly Dictionary<
        string,
        (string BaseUnit, decimal Multiplier)> Conversions = new(StringComparer.OrdinalIgnoreCase)
        {
            ["st"] = ("st", 1m),

            ["krm"] = ("ml", 1m),
            ["tsk"] = ("ml", 5m),
            ["msk"] = ("ml", 15m),
            ["ml"] = ("ml", 1m),
            ["cl"] = ("ml", 10m),
            ["dl"] = ("ml", 100m),
            ["l"] = ("ml", 1000m),

            ["g"] = ("g", 1m),
            ["hg"] = ("g", 100m),
            ["kg"] = ("g", 1000m)
        };

    public static bool IsSupported(string? unit)
    {
        if (string.IsNullOrWhiteSpace(unit))
        {
            return false;
        }

        return Conversions.ContainsKey(unit.Trim());
    }

    public static string Normalize(string unit)
    {
        var normalizedUnit = unit.Trim().ToLowerInvariant();

        if (!IsSupported(normalizedUnit))
        {
            throw new ArgumentException(
                $"Enheten '{unit}' stöds inte.",
                nameof(unit));
        }

        return normalizedUnit;
    }

    public static (decimal Amount, string Unit) ConvertToBaseUnit(
        decimal amount,
        string unit)
    {
        var normalizedUnit = Normalize(unit);
        var conversion = Conversions[normalizedUnit];

        return (
            amount * conversion.Multiplier,
            conversion.BaseUnit);
    }
}