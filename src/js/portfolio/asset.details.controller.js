(function () {
    'use strict';

    function WavesAssetDetailsController($scope, events, applicationContext, dialogService) {
        var details = this;

        function transformAddress(address) {
            var result = address;

            if (isMyAddress(result))
                result = 'You';

            return result;
        }

        function isMyAddress(address) {
            return address === applicationContext.account.address;
        }

        $scope.$on(events.ASSET_DETAILS, function (event, assetId) {
            var asset = applicationContext.cache.assets[assetId];
            if (angular.isUndefined(asset))
                throw new Error('Failed to find asset details by id ' + assetId);

            details.assetId = assetId;
            details.name = asset.currency.displayName;
            details.description = asset.description;
            details.sender = transformAddress(asset.sender);
            details.isSenderCopiable = !isMyAddress(asset.sender);
            details.timestamp = asset.timestamp;
            details.totalTokens = asset.totalTokens.formatAmount();
            details.reissuable = asset.reissuable ? 'Yes' : 'No';

            dialogService.open('#asset-details-dialog');
        });
    }

    WavesAssetDetailsController.$inject = ['$scope', 'portfolio.events', 'applicationContext', 'dialogService'];

    angular
        .module('app.portfolio')
        .controller('assetDetailsController', WavesAssetDetailsController);
})();
